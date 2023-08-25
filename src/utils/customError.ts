export class CustomError extends Error {
    message!: string;
    statusCode: number;
    constructor(message: string | undefined, statusCode: number) {
      super(message); // Call the constructor of the parent class (Error) with the error message
      this.name = this.constructor.name; // Set the error name to the name of the child class (CustomError)
      this.statusCode = statusCode; // You can add custom properties specific to your custom error
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
};