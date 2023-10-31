import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ProductRes } from 'src/hooks/useProduct';

export interface ProductItemProps {
  itemDetail: ProductRes;
}

const ProductItem = ({ itemDetail }: ProductItemProps) => {
  const navigate = useNavigate();
  const handleEditBtnClick = () => {
    navigate(`/seller/product-edit`, { state: itemDetail });
  };


  return (
    <ProductItemLayout>
      <td>
        <div>
          <img src={itemDetail.image} alt='상품 이미지 ' />
          <div>
            <p>{itemDetail.product_name}</p>
            <p>
              재고 : <span>{itemDetail.stock}</span>개
            </p>
          </div>
        </div>
      </td>
      <td>{itemDetail.price?.toLocaleString()}원</td>
      <td>
        <EditBtn onClick={handleEditBtnClick}>수정</EditBtn>
      </td>
      <td>
      </td>
    </ProductItemLayout>
  );
};

const ProductItemLayout = styled.tr`
  background-color: #fff;

  td {
    margin: 0px 30px;
    padding: 16px 30px;
    vertical-align: middle;
    font-size: var(--font-md);
    border-bottom: 1px solid var(--border-color);
  }

  td:not(td:first-child) {
    text-align: center;
  }

  td div {
    display: flex;
    align-items: center;
    gap: 30px;

    div {
      align-items: stretch;
      flex-direction: column;
      gap: 10px;
    }

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      object-position: 0 0;
    }

    p {
      font-size: var(--font-md);
    }

    p:last-child {
      font-size: var(--font-sm);
      color: var(--sub-font-color);
    }
  }

  td:nth-child(2) {
    width: 30%;
  }
  td:nth-child(3),
  td:nth-child(4) {
    width: 0%;
  }
  button {
    width: 80px;
    height: 40px;
    border-radius: 5px;
  }
`;

const EditBtn = styled.button`
  color: #fff;
  background-color: var(--main-color);
`;
const DeleteBtn = styled.button`
  color: var(--sub-font-color);
  background-color: var (--white);
  border: 1.5px solid var(--border-color);
  &:hover {
    color: #000;
    border-color: #000;
  }
`;

export default ProductItem;