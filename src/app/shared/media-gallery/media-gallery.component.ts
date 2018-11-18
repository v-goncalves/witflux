import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { MediaMovie, MediaSeries, MediaType } from '../../core/media-data.model';
import { Store } from '@ngxs/store';
import { GetMediaDetails } from '../../core/store/details/details.actions';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryComponent {

  @Input() galleryTitle: string;
  @Input() ariaLabel: string;
  @Input('movieGallery') set movieGallery(movieGallery: MediaMovie[]) {
    this.mediaType = MediaType.MOVIE;
    this.gallery = movieGallery;
  }
  @Input('seriesGallery') set seriesGallery(seriesGallery: MediaSeries[]) {
    this.mediaType = MediaType.SERIES;
    this.gallery = seriesGallery;
  }

  gallery: MediaMovie[] | MediaSeries[] = [];
  mediaType: MediaType = MediaType.MOVIE;
  mediaTypeList = MediaType;
  uuid = Math.random();
  itemAlreadyInStore: {
    [id: string]: boolean;
  }[] = [];

  constructor(
    private store: Store
  ) { }

  prefetchItem(id: string, mediaType: MediaType) {
    if (!this.itemAlreadyInStore[id]) {
      this.store.dispatch(new GetMediaDetails({id: id, mediaType: mediaType}));
      this.itemAlreadyInStore[id] = true;
    }
  }
}
