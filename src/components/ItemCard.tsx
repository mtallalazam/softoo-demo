import PoundIcon from 'components/Icons/Pound.icon';
import PlusCircleIcon from 'components/Icons/PlusCircle.icon';
import MinusCircleIcon from 'components/Icons/MinusCircle.icon';
import DeleteIcon from 'components/Icons/Delete.icon';

import { CartItem } from '../commonTypes';

type PropTypes = {
  item: CartItem;
  onDelete: () => void;
  onIncreaseQty: () => void;
  onDecreaseQty: () => void;
};

const ItemCard = ({ item, onDelete, onIncreaseQty, onDecreaseQty }: PropTypes) => {
  return (
    <section data-testid="item-card" className="mb-10 flex w-full flex-col justify-between md:flex-row md:flex-nowrap">
      <section className="mb-4 flex md:mb-0">
        <section className="mr-4 h-[90px] min-h-[90px] w-[90px] min-w-[90px] overflow-hidden rounded bg-gray-600 object-cover object-center md:min-h-[130px] md:min-w-[130px]">
          <img data-testid="itemImage" src={item.img} />
        </section>
        <section>
          <h4 data-testid="itemTitle" className="mb-2 pr-6 text-xl font-semibold">
            {item.name}
          </h4>
          <p data-testid="itemPrice" className="flex items-center text-lg">
            <PoundIcon /> <span className="ml-1">{item.price} /-</span>
          </p>
        </section>
      </section>

      <section className="ml-auto flex md:block">
        <section className="mr-3 flex items-center md:mr-0 md:mb-3">
          <button
            data-testid="increaseItemButton"
            className="rounded p-2 transition-all hover:bg-gray-500 hover:text-white active:bg-gray-700"
            onClick={onIncreaseQty}
            aria-labelledby="Increase Quantity"
          >
            <PlusCircleIcon />
          </button>
          <p data-testid="itemQuantity" className="mx-2 rounded border border-gray-400 bg-gray-700 px-3 py-1 text-center">
            {item.quantity}
          </p>
          <button
            data-testid="decreaseItemButton"
            className="rounded p-2 transition-all hover:bg-gray-500 hover:text-white active:bg-gray-700"
            onClick={onDecreaseQty}
            aria-labelledby="Decrease Quantity"
          >
            <MinusCircleIcon />
          </button>
        </section>
        <button
          data-testid="deleteItemButton"
          className="flex w-full justify-center rounded p-2 text-red-500 transition-all hover:bg-red-600 hover:text-white active:bg-red-700"
          onClick={onDelete}
          aria-labelledby="Delete Item"
        >
          <DeleteIcon />
        </button>
      </section>
    </section>
  );
};

export default ItemCard;
