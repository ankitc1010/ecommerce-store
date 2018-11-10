// @flow

import React from 'react'

import { reducePrice } from '../utils/helpers'

import styles from '../styles/6-components/_components.price.scss'

type Props = {
  className?: string,
  price: number,
  reduction?: number,
}

const Price = ({ price, reduction, className }: Props) => {
  const reducedAmount = reducePrice(price, reduction)

  if (reduction) {
    return (
      <div className={className}>
        <span className={styles.reduced}>&#8377;{reducedAmount}</span>
        <span className={styles.original}>&#8377;{price}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <span className={styles.amount}>&#8377;{price}</span>
    </div>
  )
}

Price.defaultProps = {
  reduction: 0,
  className: '',
}

export default Price
