import { useExample } from '../../../hooks/useExample';

export default function LocalComponent() {
  const { price, loading } = useExample();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (price != null) {
    return <p>Price: {price}</p>;
  }

  return <p>Failed to load price</p>;
}
