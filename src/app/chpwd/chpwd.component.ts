import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chpwd',
  templateUrl: './chpwd.component.html',
  styleUrls: ['./chpwd.component.css']
})
export class ChpwdComponent implements OnInit {
  empInfo: any;
  oldpassword: string = "";
  newpassword: string = "";
  cnewpassword: string = "";
  constructor(private loginService: LoginService, private stateService: StatemanagementService
    , private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
  }

  ganti() {
    if (this.newpassword !== this.cnewpassword) {
      this.toastr.warning('', 'Password dan Konfirmasinya tidak sama!');
      return;
    }
    this.stateService.setTraffic(true);
    this.loginService.login(this.empInfo.Username, this.oldpassword)
      .subscribe(res => {
        this.loginService.chPwd(this.empInfo.Username, this.newpassword).subscribe(res=>{
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Password sudah berubah');
          this.loginService.logout();
          this.router.navigate(['/main/login']);
        },
        err => { 
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Terjadi kesalahan jaringan');})
      },
        err => { 
          this.stateService.setTraffic(false);
          this.toastr.error('', 'Anda salah input password lama!');}
      );
  }
}
