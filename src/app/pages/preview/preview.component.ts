import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  id;
  previewData;
  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getData(this.id);
  }

  getData(id) {
    this.helperService.fetchData().subscribe((res: any) => {
      this.previewData = res.find(item => Number(item.id) === Number(id));
    });
  }

  navigate(link) {
    console.log(link)
    this.router.navigate(['/']);
  }
}
