import Report from './reportModel.js'
import Topic from '../topic/topicModel.js'
import Argument from '../argument/argumentModel.js'
import points from '../../utils/points.js'



class ReportService {

    addReport = async (type, reportedId, description, user) => {

        if (!reportedId) throw new Error('No ID.');
        if (type !== "argument" && type !== "topic") throw new Error('Wrong type.');

        const report = await Report.findOne({ reportedId })

        if (report) {

            if (user.isAdmin) {
                return await this.deleteReportAndItems(report)
            }
            else if (user.isMod) {
                return await this.hideReportAndItems(report, user)
            }
            else if (report.agreed.includes(user._id) || report.user.equals(user._id)) {
                throw new Error('You have already reported this item');
            }
            else {
                report.agreed.push(user)
                await report.save()
                return "yes"
            }
        }
        else {

            const report = await Report.create({
                type,
                reportedId,
                description,
                user
            })

            if (user.isAdmin) {
                await this.deleteReportAndItems(report)
            }

            else if (user.isMod) {
                await this.hideReportAndItems(report, user)
            }

            return "Report created"
        }
    }

    getReport = async (user) => {

        if (user.isAdmin) {
            const report = await this.getAdminReport(user)
            if (!report) throw new Error('No more reports');
            else return report
        }
        else if (user.isMod) {
            const report = await this.getUserReport(user)
            if (!report) throw new Error('No more reports');
            else return report
        }
        else {
            const report = await this.getUserReport(user, 0)
            if (!report) throw new Error('No more reports');
            else return report
        }
    }


    getItem = async (type, reportedId) => {

        if (type === "argument") {
            const argument = await Argument.findById(reportedId)
                .populate({ path: 'user', model: 'User', select: 'username' })

            if (argument) return argument
            else return null
        }
        if (type === "topic") {
            const topic = await Topic.findById(reportedId)
            if (topic) return topic
            else return null
        }

        else return null;
    }

    getUserReport = async (user, start) => {

        let reports = await Report.find({ active: true })
            .sort({ "_id": -1 })
            .skip(start)
            .limit(20)
        
        for (let i = 0; i < reports.length; i++) {

            const report = reports[i]

            if (report.agreed.includes(user._id)) continue;
            if (report.disagreed.includes(user._id)) continue;
            if (report.user.equals(user._id)) continue;

            const item = await this.getItem(report.type, report.reportedId)

            if (item) {
                return {
                    report: {
                        _id: report._id,
                        reportedId: report.reportedId,
                        type: report.type
                    },
                    item: item
                }
            }
            else {
                await Report.deleteOne({ _id: report._id })
                continue;
            }
        }

        if (reports.length === 20) {
            return await this.getUserReport(user, start += 20)
        }
        else {
            return null
        }
    }


    getAdminReport = async (user) => {

        let report = await Report.findOne({ active: false })
            .sort({ "_id": -1 })


        if (!report) throw new Error('No more reports');

        const item = await this.getItem(report.type, report.reportedId)
        if (item) {
            return {
                report: {
                    _id: report._id,
                    reportedId: report.reportedId,
                    type: report.type,
                    agreed: report.agreed.length,
                    disagreed: report.disagreed.length
                },
                item: item
            }
        }
        else {
            await Report.deleteOne({ _id: report._id })
            return await getAdminReport(user);
        }
    }


    increaseReport = async (user, id) => {

        const report = await Report.findById(id)
        if (!report) throw new Error('Cannot find report');

        if (user.isAdmin) {
            return await this.deleteReportAndItems(report)
        }
        else if (user.isMod) {
            return await this.hideReportAndItems(report, user)
        }
        else {

            if (report.agreed.includes(user._id)) throw new Error('Already moderated this item');
            if (report.disagreed.includes(user._id)) throw new Error('Already moderated this item');
            if (report.user.equals(user._id)) throw new Error('Already moderated this item');

            report.agreed.push(user)
            await report.save()
            return "yes"
        }
    }

    decreaseReport = async (user, id) => {

        const report = await Report.findById(id)
        if (!report) throw new Error('Cannot find report');

        if (user.isAdmin) {

            let item = null

            if (report.type === "topic") item = await Topic.findById(report.reportedId)
            if (report.type === "argument") item = await Argument.findById(report.reportedId)
            if (!item) throw new Error('Cannot find item.')

            await points.AddModPoints(report, false, null)

            item.active = true
            report.deleteOne()

            await item.save()
            return "no"
        }
        else if (user.isMod) {

            report.active = false
            report.sanctioned = false
            report.moderator = user
            await report.save()
            return "no"
        }
        else {

            if (report.agreed.includes(user._id)) throw new Error('Already moderated this item');
            if (report.disagreed.includes(user._id)) throw new Error('Already moderated this item');
            if (report.user.equals(user._id)) throw new Error('Already moderated this item');

            report.disagreed.push(user)
            await report.save()
            return "no"
        }
    }

    deleteReportAndItems = async (report) => {


        if (report.type === "topic") {

            const topic = await Topic.findById(report.reportedId)
                .populate({ path: 'cons' })
                .populate({ path: 'pros' })

            await points.AddModPoints(report, true, topic.user)

            topic.pros.forEach(pro => {
                Argument.deleteOne({ _id: pro._id })
            })

            topic.cons.forEach(con => {
                Argument.deleteOne({ _id: con._id })
            })

            await Topic.deleteOne({ _id: report.reportedId })
        }

        if (report.type === "argument") {

            const argument = await Argument.findById(report.reportedId)

            await points.AddModPoints(report, true, argument.user)

            await Argument.deleteOne({ _id: report.reportedId })
        }

        await Report.deleteOne({ _id: report._id })

        return "yes"
    }

    hideReportAndItems = async (report, user) => {

        let item = null

        if (report.type === "topic") item = await Topic.findById(report.reportedId)
        if (report.type === "argument") item = await Argument.findById(report.reportedId)
        if (!item) throw new Error('Cannot find item.')

        item.active = false
        report.active = false
        report.sanctioned = true
        report.moderator = user

        await report.save()
        await item.save()
        return "yes"
    }
}

export default new ReportService
