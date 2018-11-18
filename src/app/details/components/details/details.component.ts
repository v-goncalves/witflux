import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsApiService } from '../../../core/media-api-services/details-api.service';
import { MediaDetail, MediaType } from '../../../core/media-data.model';
import { Store } from '@ngxs/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DetailsState } from '../../../core/store/details/details.state';
import { GetMediaDetails } from '../../../core/store/details/details.actions';

@Component({
  selector: 'app-details-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DetailsApiService
  ]
})
export class DetailsComponent implements OnInit, OnDestroy {

  mediaDetails: MediaDetail;
  private id: string;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    const mediaType: MediaType = this.activatedRoute.snapshot.params.type === 'movie' ? MediaType.MOVIE : MediaType.SERIES;
    this.store
      .dispatch(new GetMediaDetails({id: this.id, mediaType: mediaType}));
  }

  ngOnInit() {
    this.store.select(DetailsState.selectDetailsById(this.id))
      .pipe(
        takeUntil(this.destroy$),
        // filter by distinct values (if it's the same value, it should be ignored)
        filter(v => v && (!this.mediaDetails || JSON.stringify(this.mediaDetails) !== JSON.stringify(v)))
      )
      .subscribe(mediaDetails => {
        this.mediaDetails = mediaDetails;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
