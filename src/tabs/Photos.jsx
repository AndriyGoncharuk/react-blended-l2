import { getPhotos } from 'apiService/photos';
import { Form, Loader, PhotosGallery, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]);
  
  const [isloading, setIsloading] = useState(false);

  const [error, setError] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);

const [isWisebele, setisWiseble] = useState(false)

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      setIsloading(true);
      try {
        const {photos, per_page, total_results} = await getPhotos(query, page);
        if(!photos.length){
          return setIsEmpty(true)
        } 
        setImages((pervImages)=> [...pervImages, ...photos])
        setisWiseble(page<Math.ceil(total_results/per_page))
        } catch (error) {
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setisWiseble(false);
    setIsEmpty(false);
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length>0 && <PhotosGallery images={images}/>}
      {!images.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>} 
      {isloading && <Loader/>}
      {error && <Text textAlign="center">❌ Something went wrong - {error}</Text>}
      {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
    </>
  );
};
