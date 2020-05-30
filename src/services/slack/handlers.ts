import { Request, Response } from "express";
import { Brew } from "../../entities/Brew";
import { getManager } from "typeorm"
const https = require('https')
import moment from 'moment';


export async function logBrew(request: Request, response: Response) {

    let brew = new Brew();
    brew.date = new Date();

    const brewRepository = getManager().getRepository(Brew);
    await brewRepository.save(brew);
    postMessage();

    response.send("success");
}

export async function getLatestBrew(request: Request, response: Response) {

    const brewRepository = getManager().getRepository(Brew);
    let brews = await brewRepository
        .find({ order: { id: "DESC" }, take: 1 });

    if (brews.length > 0) {
        let timeAgo = moment(brews[0].date).fromNow();
        let time = moment(brews[0].date).format('MMMM Do YYYY, HH:mm');

        response.json({ response_type: "in_channel", text: `Someone made coffee ${timeAgo}. (${time})` });
    }
}

export const postMessage = () => {

    const data = JSON.stringify({
        text: 'Somebody just turned on the coffe machine. Fresh POT!!!!!'
    })

    const options = {
        hostname: 'hooks.slack.com',
        path: `/services/${process.env.SLACK_WEBHOOK}`,
        port: '443',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, (res: Response) => {
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.write(data)
    req.end()
};