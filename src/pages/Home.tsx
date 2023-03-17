import { useEffect, useState, useMemo } from 'react';

import { Item, CartItem } from '../commonTypes';

import ItemCard from '../components/ItemCard';
import PoundIcon from 'components/Icons/Pound.icon';

const Home = () => {
  // Local State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);

  // Computed Values
  const filterOptions = useMemo(() => {
    const options = cart.map((item) => item.colour);
    return options;
  }, [cart]);

  const filteredCartItems = useMemo(() => {
    let filteredItems: CartItem[] = JSON.parse(JSON.stringify(cart));
    if (selectedFilter == undefined) {
      return filteredItems;
    }
    filteredItems = filteredItems.filter((item) => {
      return item.colour == selectedFilter;
    });
    return filteredItems;
  }, [cart, selectedFilter]);

  const totalAmount = useMemo(() => {
    const totalAmount = filteredCartItems.reduce((acc, item) => (acc += item.quantity * item.price), 0);
    return totalAmount.toFixed(2);
  }, [cart, selectedFilter]);

  // Methods
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch('https://my-json-server.typicode.com/benirvingplt/products/products').then(async (res) => {
        return await res.json();
      });
      const cartItems: CartItem[] = data.map((item: CartItem) => {
        item.quantity = 1;
        return item;
      });
      setCart(cartItems);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncreaseItemQuantity = (id: number) => {
    setCart((items) => {
      const itemsArr: CartItem[] = JSON.parse(JSON.stringify(items));
      const selectedItemIndex = itemsArr.findIndex((item) => item.id === id);
      itemsArr[selectedItemIndex].quantity++;
      return itemsArr;
    });
  };

  const handleDecreaseItemQuantity = (item: CartItem) => {
    if (item.quantity < 2) {
      handleRemoveItemFromCart(item.id);
      return;
    }
    setCart((items) => {
      const itemsArr = JSON.parse(JSON.stringify(items));
      const selectedItemIndex = itemsArr.findIndex((x: Item) => x.id === item.id);
      itemsArr[selectedItemIndex].quantity--;
      return itemsArr;
    });
  };

  const handleRemoveItemFromCart = (id: number) => {
    setCart((items) => {
      let itemsArr: CartItem[] = JSON.parse(JSON.stringify(items));
      itemsArr = itemsArr.filter((item) => item.id !== id);
      return itemsArr;
    });
  };

  const handleFilterOptionChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value == 'Select a Color') {
      setSelectedFilter(undefined);
      return;
    }
    setSelectedFilter(e.currentTarget.value);
  };

  // Life-cycle Hooks
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <section className="mb-3">
            <select className="rounded border border-gray-400 bg-gray-500 p-2" onChange={handleFilterOptionChange}>
              <option value={undefined}>Select a Color</option>
              {filterOptions.map((item, index) => (
                <option key={`${item}-${index}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </section>

          <section>
            {filteredCartItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={() => handleRemoveItemFromCart(item.id)}
                onIncreaseQty={() => handleIncreaseItemQuantity(item.id)}
                onDecreaseQty={() => handleDecreaseItemQuantity(item)}
              />
            ))}
          </section>

          <section className="flex items-center justify-end rounded border border-gray-400 bg-gray-700 p-2 px-3">
            <p className="mr-2 text-xl font-bold">Total:</p>
            <div className="flex items-center justify-center">
              <PoundIcon />
              <p className="ml-1 text-xl leading-none">{totalAmount} /-</p>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default Home;
