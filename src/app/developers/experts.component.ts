import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Expert } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';
import { SortPipe } from '../shared/utility-pipes.pipe';

@Component({

    selector: 'experts-list',
    templateUrl: 'experts.component.html',
    styleUrls: ['experts.component.scss']

})
export class ExpertsComponent {
    experts;
    auth;

    constructor(private router: Router, private expertService: FirebaseService<Expert>, private authService: AuthService, private af: AngularFire) {
        this.experts = af.database.list('/experts/').map(list => {
            list.forEach(item => {
                item.observable = af.database.object('/users/' + item.$key);
            });
            return list;
        });

        // I need to convert from:
        // Observable<{key:boolean}[]> to Observable<Expert[]>



        //this.experts = expertService.list;
        this.auth = authService;
    }

    edit(expert) {
        this.router.navigate(['developers',expert.$key, 'edit']);
    }
}
