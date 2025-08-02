import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class ExceptionHandler implements ErrorHandler
{
    
     handleError(error: any): void {
        console.log('MEssage:',error.message);
        console.log('StackTrace:',error.stack);
    }
}