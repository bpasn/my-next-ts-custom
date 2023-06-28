import axios, { AxiosError } from "axios";
import { NextApiResponse } from "next";

export default class Reporting extends Error {
    public code: string | undefined;
    public status: number | undefined;
    public success: boolean | undefined;
    constructor(error?:any) {
        super(error?.message);
        Object.setPrototypeOf(this, Reporting.prototype)
    }

    report(error: any, res: NextApiResponse) {
        this.success = false;
        this.code = error.code;
        this.status = error.status;
        if (axios.isAxiosError(error)) {
            this.message = error.response && error.response.data ? error.response.data.message : error.message
            this.code = error.response && error.response.data ? error.response.data.code : error.code
            this.status = error.response && error.response.data ? error.response.data.status : error.status
        }
        else if (error instanceof Error) {
            this.message = error.message
        }
        res.status(500).send(this)
        // res.status(Number(this.code)).json({
        //     message: this.message,
        //     code: this.code ?? 500,
        //     success: this.success
        // })
    }

    reportCli(error:any){
        this.success = false;
        this.code = error.code;
        this.status = error.status;
        if (axios.isAxiosError(error)) {
            this.message = error.response && error.response.data ? error.response.data.message : error.message
            this.code = error.response && error.response.data ? error.response.data.code : error.code
            this.status = error.response && error.response.data ? error.response.data.status : error.status
        }
        else if (error instanceof Error) {
            this.message = error.message
        }
        return this;
    }

}