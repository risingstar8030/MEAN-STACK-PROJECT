export class Student{
    constructor(
        public regid:String,
        public newpassword : String,
        public branch?:String,
        public admyear?:Number,
        public oldpassword?:String,
    ){}
}