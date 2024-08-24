import { GridItem } from "..";
import css from './PhotosGalleryItem.module.css'

export const PhotosGalleryItem = ({alt, src, avg_color}) => {
  return <GridItem><div style={{backgroundColor: avg_color, borderColor: avg_color}} className={css.thumb}><img src={src.large} alt={alt} /></div></GridItem>
};
