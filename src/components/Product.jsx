// @flow

import React from 'react'

import Button from './Button'
import { Layout, LayoutItem } from './Layout'
import ItemQuantity from './ItemQuantity'
import Ratio from './Ratio'
import SizePicker from './SizePicker'

import styles from '../styles/6-components/_components.product.scss'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  productId: String,
  product: Object,
  fetchProduct: Function,
  addItemToCart: Function,
}

type State = {
  quantity: number,
  size: string,
}

class Product extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      quantity: 1,
      size: '',
    }

    this.onAddItemToCart = this.onAddItemToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.onSizeSelect = this.onSizeSelect.bind(this)
  }

  state: State

  componentDidMount() {
    this.props.fetchProduct(this.props.productId)
  }

  onAddItemToCart() {
    if (this.state.size) {
      this.props.addItemToCart({
        id: this.props.productId,
        title: this.props.product.fields.productTitle,
        size: this.state.size,
      }, parseInt(this.state.quantity, 10))
    } else {
      // eslint-disable-next-line
      window.alert('Please select a size')
    }
  }

  onAddItemToCart: Function
  onSizeSelect: Function

  onSizeSelect(size: Object) {
    this.setState({
      size: size.size,
    })
  }

  props: Props
  handleChange: Function
  increaseQuantity: Function
  decreaseQuantity: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  increaseQuantity() {
    const quantity = this.state.quantity + 1
    this.setState({ quantity })
  }

  decreaseQuantity() {
    const quantity = this.state.quantity > 1 ? this.state.quantity - 1 : 1
    this.setState({ quantity })
  }

  render() {
    const {
      isLoading,
      hasErrored,
      product,
    } = this.props

    if (isLoading || !product) {
      return <p>Loading product ...</p>
    }

    if (hasErrored) {
      return <p>There was an error</p>
    }

    const {
      productTitle,
      productImage,
      productDescription,
      price,
      sizeSmall,
      sizeMedium,
      sizeLarge,
    } = product.fields

    return (
      <Layout>
        <LayoutItem cols="2/4@tablet">
          <Ratio ratio="4:3">
            <img src={`${productImage.fields.file.url}?w=600&h=450&fit=thumb&f=top`} alt={productImage.fields.title} />
          </Ratio>
        </LayoutItem>
        <LayoutItem cols="2/4@tablet">
          <h2 className={`${styles.title} u-h2`}>{productTitle}</h2>
          <p>&pound;{price}</p>
          <p>{productDescription}</p>
          <div className="u-margin-bottom">
            <ItemQuantity
              quantity={this.state.quantity}
              onChange={this.handleChange}
              onIncrease={this.increaseQuantity}
              onDecrease={this.decreaseQuantity}
            />
            <span className="u-margin-left">
              <Button text="Add to cart" onClick={this.onAddItemToCart} />
            </span>
          </div>
          <SizePicker
            sizes={[
              { size: 's', available: sizeSmall },
              { size: 'm', available: sizeMedium },
              { size: 'l', available: sizeLarge },
            ]}
            onSelect={this.onSizeSelect}
            selected={this.state.size}
          />
        </LayoutItem>
      </Layout>
    )
  }
}

export default Product
