import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import Utils from '../utils/utils';

@Injectable()
export class RoutesGuard implements CanActivate {
	constructor(public router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot) {
        let token =Utils.GetSessionStorage('token')
        if(token != '' && token != null){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
	}
}
