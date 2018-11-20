import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MediaMovie, MediaSeries, MediaType } from '../../core/media-data.model';
import { Store } from '@ngxs/store';
import { GetMediaDetails } from '../../core/store/details/details.actions';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

export interface MediaMovieView extends MediaMovie {
  show: boolean;
}
export interface MediaSeriesView extends MediaSeries {
  show: boolean;
}

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryComponent implements OnInit, OnDestroy {

  @Input() galleryTitle: string;
  @Input() ariaLabel: string;
  @Input('movieGallery') set movieGallery(movieGallery: MediaMovie[]) {
    if (movieGallery && movieGallery.length) {
      this.mediaType = MediaType.MOVIE;
      this.gallery = movieGallery.map(v => ({...v, show: false}));
      this.changeDetectorRef.detectChanges();
      setTimeout(() => { // after ngFor
        this.checkGalleryVisibility();
      });
    }
  }
  @Input('seriesGallery') set seriesGallery(seriesGallery: MediaSeries[]) {
    if (seriesGallery && seriesGallery.length) {
      this.mediaType = MediaType.SERIES;
      this.gallery = seriesGallery.map(v => ({...v, show: false}));
      this.changeDetectorRef.detectChanges();
      setTimeout(() => { // after ngFor
        this.checkGalleryVisibility();
      });
    }
  }

  @ViewChildren('link') link: QueryList<ElementRef<HTMLInputElement>>;

  gallery: MediaMovieView[] | MediaSeriesView[] = [];
  mediaType: MediaType = MediaType.MOVIE;
  mediaTypeList = MediaType;
  uuid = Math.random();
  itemAlreadyInStore: {
    [id: string]: boolean;
  }[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  private scroll: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // load content on scroll
    const listener = () => {
      this.scroll.emit();
    };
    this.document.addEventListener('scroll', listener, true);
    this.destroy$.subscribe(() => {
      this.document.removeEventListener('scroll', listener, true);
    });
    this.zone.runOutsideAngular(() => {
      this.scroll
        .pipe(
          debounceTime(20),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.checkGalleryVisibility();
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isElementVisibleInViewPort(elem): boolean {
    const bounding = elem.getBoundingClientRect();
    return bounding.top < window.innerHeight;
  }

  checkGalleryVisibility() {
    let hasChanges = false;
    this.link.forEach((item, index) => {
      if (!this.gallery[index].show && this.isElementVisibleInViewPort(item.nativeElement)) {
        this.gallery[index].show = true;
        hasChanges = true;
      }
    });
    if (hasChanges) {
      this.gallery = <MediaMovieView[] | MediaSeriesView[]>[...this.gallery];
      this.changeDetectorRef.detectChanges();
    }
  }

  prefetchItem(id: string, mediaType: MediaType) {
    if (!this.itemAlreadyInStore[id]) {
      this.store.dispatch(new GetMediaDetails({id: id, mediaType: mediaType}));
      this.itemAlreadyInStore[id] = true;
    }
  }
}
