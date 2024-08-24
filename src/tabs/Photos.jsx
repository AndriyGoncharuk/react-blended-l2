import { getPhotos } from 'apiService/photos';
import { Form, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]);

  const [isloading, setIsloading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      setIsloading(true);
      try {
        const data = await getPhotos(query, page);
        console.log(data);
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
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};
