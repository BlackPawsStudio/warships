import { setIsSelected } from '../../../store/dragStateSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ShipType } from '../../../types';

const Ship = ({ id, type, size }: ShipType) => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector(
    ({ dragStateSlice: toolkit }) => {
      return {
        selected: toolkit.isSelected,
      };
    }
  );

  const select = () => {
    if (selected && selected.id === id) dispatch(setIsSelected(null));
    else dispatch(setIsSelected({ id: id, type: type, size: size }));
  };

  return (
    <div
      onClick={select}
      className='ship'
      style={{
        width: `calc(${size} * 5vh)`,
        background: selected && selected.id === id ? '#00f' : '#00ff00',
      }}
    />
  );
};

export default Ship;
