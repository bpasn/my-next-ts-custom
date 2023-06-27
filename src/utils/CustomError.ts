import { AxiosError } from "axios";
import { NextApiResponse } from "next";

export default class Reporting extends Error {
    code: string;
    status: string;
    success: boolean;
    constructor() {
        super();
        // super(msg);
        Object.setPrototypeOf(this, Reporting.prototype)
    }

    report(error: any, res: NextApiResponse) {
        this.success = false;
        this.code = error.code;
        if (error instanceof AxiosError) {
            this.message = error.response && error.response.data ? error.response.data.message : error.message
            this.code = error.response && error.response.data ? error.response.data.code : error.code
            this.status = error.response && error.response.data ? error.response.data.status : error.status
        }
        else if (error instanceof Error) {
            this.message = error.message
        }
        
        res.status(Number(this.code)).json({
            message:this.message,
            code:this.code,
            success:this.success
        })
    }

}