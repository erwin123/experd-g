export class Draweritems {
    name:string;
    icon:string;
    url:string="";
    desc:string="";
}

export class Banner {
    BannerDesc:string="";
    BannerPath:string="";
}

export class Chat{
    Id:number;
    OwnerCode:string;
    DocumentType:string;
    TheText:string;
    CreatedBy:string;
    CreatedDate:string;
    Name:string;
}

export class User{
    Id:number;
    UserCode:string;
    Username:string;
    Name:string;
    RoleCode:string;
    BranchCode:string;
    CompanyCode:string;
    CreatedBy:string;
    CreatedDate:string;
    CheckToMove:boolean=false;
    Email:string;
}

export class Project{
    ProjectCode:string;
    Name:string;
    Start:string;
    End:string;
    CompanyCode:string;
}

export class ProblemIdentify{
    Id:number;
    DocumentCode:string;
    Filename:string;
    Description:string="";
    CreatedDate:string;
    CreatedBy:string;
    UserCode:string;
    Complete:string="0";
    ProjectCode:string;
    Commit:string="";
}

export class Solution{
    Id:number;
    DocumentCode:string;
    Solution:string="";
    Target:string="";
    Deadline:any="";
    CreatedDate:string;
    CreatedBy:string;
    UserCode:string;
    Complete:string="0";
    ProjectCode:string;
    ActionOrder:number=0;
}

export class Execution{
    Id:number;
    DocumentCode:string;
    Description:string="";
    Filename:string="";
    CreatedDate:string;
    CreatedBy:string;
    UserCode:string;
    Step:string;
    Complete:string="0";
    ProjectCode:string;
}

export class Cnc{
    Id:number;
    ProjectCode:string;
    UserCode:string;
    CoachCode:string;
}

export class Email{
    MessageBody:string;
    MessageFrom:string;
    MessageTo:string;
    MessageSubject:string;
    MessageCc:string;
}