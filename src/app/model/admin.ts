export class Admin{
    constructor(
        public regid:String,
        public newpassword : String,
        public department?:String,
        public oldpassword?:String,
    ){}
}