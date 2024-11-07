import { render } from '@testing-library/react';

import ProductItemsTable from './ProductItemsTable';

describe('ProductItemsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductItemsTable />);
    expect(baseElement).toBeTruthy();
  });
});
