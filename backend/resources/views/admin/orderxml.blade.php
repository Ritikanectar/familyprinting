<?xml version="1.0" encoding="utf-8"?>
<Orders pages="1">
  @foreach($xml as $rows)
  <Order>
    <OrderID><![CDATA[{{$rows->order_id}}]]></OrderID>
    <OrderNumber><![CDATA[{{$rows->reciept_id}}]]></OrderNumber>
    <OrderDate>{{date('d/m/Y H:i a',strtotime($rows->created_date))}}</OrderDate>
    <OrderStatus><![CDATA[paid]]></OrderStatus>
    <LastModified>{{date('d/m/Y H:i a',strtotime($rows->created_date))}}</LastModified>
    <ShippingMethod><![CDATA[USPSPriorityMail]]></ShippingMethod>
    <PaymentMethod><![CDATA[Credit Card]]></PaymentMethod>
    <CurrencyCode>USD</CurrencyCode> 
    <OrderTotal>10.00</OrderTotal>
    <TaxAmount>0.00</TaxAmount>
    <ShippingAmount>4.50</ShippingAmount>
    <CustomerNotes><![CDATA[Thank You!]]></CustomerNotes>
    <InternalNotes><![CDATA[Shipping Demo.]]></InternalNotes>
    <Gift>false</Gift>
    <GiftMessage></GiftMessage>
    <CustomField1></CustomField1>
    <CustomField2></CustomField2>
    <CustomField3></CustomField3>
    <Customer>
      <CustomerCode><![CDATA[{{$rows->email}}]]></CustomerCode>
      <BillTo>
        <Name><![CDATA[{{$rows->first_name.' '.$rows->last_name}}]]></Name>
        <Company><![CDATA[Family Industries]]></Company>
        <Phone><![CDATA[{{$rows->contact}}]]></Phone>
        <Email><![CDATA[{{$rows->email}}]]></Email>
      </BillTo>
      <ShipTo>
        <Name><![CDATA[{{$rows->first_name.' '.$rows->last_name}}]]></Name>
        <Company><![CDATA[Family Industries]]></Company>
        <Address1><![CDATA[{{$rows->address_1}}]]></Address1>
        <Address2><![CDATA[{{$rows->address_2}}]]></Address2>
        <City><![CDATA[{{$rows->city}}]]></City>
        <State></State>
        <PostalCode><![CDATA[{{$rows->zip}}]]></PostalCode>
        <Country><![CDATA[US]]></Country>
        <Phone><![CDATA[{{$rows->contact}}]]></Phone>
      </ShipTo>
    </Customer>
    <Items>
      <Item>
        <SKU><![CDATA[{{$rows->product_id}}]]></SKU>
        <Name><![CDATA[{{$rows->product_name}}]]></Name>
        <ImageUrl></ImageUrl>
        <Weight>10.00</Weight>
        <WeightUnits>Ounces</WeightUnits>
        <Quantity>1</Quantity>
        <UnitPrice>10.00</UnitPrice>
        <Location></Location>
        <Options>
          <Option>
            <Name><![CDATA[Size]]></Name>
            <Value><![CDATA[{{$rows->product_size}}]]></Value>
            <Weight>10</Weight>
          </Option>
          <Option>
            <Name><![CDATA[Color]]></Name>
            <Value><![CDATA[{{$rows->product_color}}]]></Value>
            <Weight>5</Weight>
          </Option>
        </Options>
      </Item>
      <Item>
        <SKU></SKU>
        <Name><![CDATA[$10 OFF]]></Name>
        <Quantity>1</Quantity>
        <UnitPrice>-10.00</UnitPrice>
        <Adjustment>true</Adjustment>
      </Item>
    </Items>
  </Order>
@endforeach
</Orders>