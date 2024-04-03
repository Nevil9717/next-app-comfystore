import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
});

const PDFInvoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <View style={styles.section}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Product</Text>
              <Text style={styles.tableCell}>Quantity</Text>
              <Text style={styles.tableCell}>Price</Text>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            {order.products.map((product, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{product.productName}</Text>
                <Text style={styles.tableCell}>{product.productQuantity}</Text>
                <Text style={styles.tableCell}>{product.productPrice}</Text>
                <Text style={styles.tableCell}>
                  {product.productQuantity * product.productPrice}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              Total Amount: {order.paymentDetails.amountTotal}{" "}
              {order.paymentDetails.currency}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFInvoice;
