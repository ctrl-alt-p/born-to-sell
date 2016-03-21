# Intrinsic & Time Value
Time value is the reason you sell covered calls.  An option is a decaying asset, it looses money over time if the price stays the same or goes down.

An option's premium is composed of two components: intrinsic value and time value.  

## Intrinsic Value:
The difference between the strike price and the underlying stock's price:

```
  Stock Price = $25
  Call Strike = $24
  Intrinsic   = $25 - $24 ==> $1
```

## Time Value:
Anything in excess of the intrinsic value is the time value:

```
  Stock Price = $25
  Call Strike = $24
  Intrinsic   = $25 - $24 ==> $1
  Time Value  = $3 - $2   ==> $2
```

## Time Decay:
Over an options lifetime, 1/3 of the value is lost in the first half and 2/3 in the second half.  The time decay increases significantly as the option approaches it's expiration date.  This is known as time decay.

Read more: [Time Value Definition](http://www.investopedia.com/terms/t/timevalue.asp)

## Upside Potential
The upside potential is the distance between the strike price and stock price for OTM options.

It is wise sometimes to sell an OTM option on your stock so you can capture some of this upside potential.

For example:

```
  Stock Price      = $35
  Call Strike      = $40
  Upside Potential = $40 - $35 ==> $5
```

In this scenario the maximum upside potential is $5.  You make the most money when the stock is >= $40:
- Upside     = $5.00 * 100 shares ==> $500
- Time Value = $2.50 * 100 shares ==> $250
- Total Profit = $500 + $250      ==> $750
