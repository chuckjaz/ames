import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Expert, Community } from '../shared/models';
import { PickerComponent } from '../shared/picker.component';
import { AuthService } from '../shared/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'expert-form',
    templateUrl: 'expert-form.component.html',
    styleUrls: ['expert-form.component.css']
})
export class ExpertFormComponent {
    @Output() update = new EventEmitter<Expert>();
    @Output() delete = new EventEmitter<Expert>();
    @Input() expert : Expert;

    newContent: {type: string,title: string,url: string, $key?: string} = {type:null,title:null,url:null};

    constructor(public auth : AuthService, public af : AngularFire) { }

    save(savedValue: Expert) {
        event.preventDefault();
        this.update.emit(savedValue);
    }

    deleteThis() {
        this.delete.emit(this.expert);
    }

    // Take a new emitted list of keys
    chooseCommunities(list : string[]) {
        console.log("Community List is now ",list);
        this.expert.communities = list;
    }

    createContent() {

        if(this.newContent.$key) {
            let contentObject = this.af.database.object('/users/' + this.expert.$key + '/content/' + this.newContent.$key);
            let key = this.newContent.$key;
            delete this.newContent.$key;
            contentObject.update(this.newContent);
            this.newContent.$key = key;
        } else {
            let contentList = this.af.database.list('/users/' + this.expert.$key + "/content/");
            contentList.push(this.newContent);
            this.newContent = {title:null,type:null,url:null};
        }
    }

    editContent(content) {
        console.log(content);
        this.newContent = content;
    }


}
