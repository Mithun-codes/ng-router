import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

    course: Course;

    couponCode: string;
    // couponCode$: Observable<any>;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.course = this.route.snapshot.data["course"];
      this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");
      // this.couponCode$ = this.route.queryParams.pipe(map(item=>item.couponCode));
    }


    confirmExit() {
      return confirm(`Are you sure you want to exit ${this.course.description}`);
    }

}











