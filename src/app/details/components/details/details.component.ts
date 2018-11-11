import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DetailsService } from '../../services/details.service';
import { MediaDetails } from '../../../shared/store/media.model';

@Component({
  selector: 'app-details-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [
    DetailsService
  ]
})
export class DetailsComponent implements OnDestroy {

  mediaDetails: MediaDetails;
  id: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private detailsService: DetailsService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    const mediaType = this.activatedRoute.snapshot.params.type;

    (mediaType === 'movie' ? this.detailsService.getMovieDetails(this.id) : this.detailsService.getSeriesDetails(this.id))
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(detailsData => {
        this.mediaDetails = detailsData;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
