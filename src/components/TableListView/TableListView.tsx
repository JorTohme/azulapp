import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../utils/Colors";
import Table from "../Table/Table";

export default function TableListView({data, selectedSpace}) {

  const [detailData, setDetailData] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let total = 0;
    if (detailData) {
      detailData.orders.map((order) => {
        order.items.map((item) => {
          total += item.price * item.amount;
        })
      })
    }
    setTotal(total);
  }, [detailData]);
  
  return (
    <View style={{flexDirection: 'row'}}>
      <ScrollView style={[s.scrollViewList]} contentContainerStyle={[s.listView, {paddingBottom: 200}]}>
        {
          data[selectedSpace].tables.map((table, index) => {
            return (<Table key={index} state='free' shape='square' id={table.id}
            onClick={() => setDetailData(table)}/>)
          })
        }
      </ScrollView>
      <View style={s.detailContainer}>
        <View style={s.detail}>
          {
            detailData && detailData.orders.map((order, index) => {
              return (
                <>
                  <View key={index} style={s.order2}>
                    <Text style={{fontWeight: '500'}}>Orden {order.name}</Text>
                    {
                      order.items.map((item, index) => {
                        return (
                          <View key={index} style={s.orderDetail} >
                            <View style={s.orderStyle}>
                              <View style={s.amount}>
                                <Text>{item.amount}</Text>
                                <Text>{item.name}</Text>
                              </View>
                              <Text>$ {item.price}</Text>
                            </View>
                            <Text>{item.note}</Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </>
              )
            })
          }
          <View style={s.total}>
            <Text style={s.totalText}>Total</Text>
            <Text style={s.totalText}>$ {total}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  listView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  scrollViewList : {
    maxWidth: 100,
    minHeight: '100%',
    borderRightColor: Colors.lightGray,
    borderRightWidth: 0.5,
  },
  detailContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.backgroundSecondary,
  },
  detail : {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
  },
  orderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderDetail: {
    paddingVertical: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  order2: {
    marginBottom: 20,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 20,
  }
})