from flask import Flask, jsonify
import json
import pandas as pd
import pickle
from sklearn.metrics import mean_squared_error

app = Flask(__name__)


with open('rf_model.pkl', 'rb') as file:
    rf_model = pickle.load(file)

X_test = pd.read_csv('testing_data.csv') 
sales= pd.read_csv('Sales_Data.csv')
                   

@app.route('/feature_importances', methods=['GET'])
def get_feature_importances():

        feature_importances = pd.DataFrame({'Feature': X_test.columns, 'Importance': rf_model.feature_importances_})
        feature_importances_sorted = feature_importances.sort_values(by='Importance', ascending=False)

        data = feature_importances_sorted.to_dict(orient='records')
        return jsonify(data)

@app.route('/top-item-sales', methods=['GET'])
def get_top_item_sales():
    item_sales = sales.groupby('Item Name')['Final Total'].sum().sort_values(ascending=False)
    top_items = item_sales.head(15)
    
    top_items_sales_list = [{'item': item, 'sales': sales} for item, sales in zip(top_items.index, top_items.values)]
    
    top_items_sales_json = jsonify(top_items_sales_list).response[0]
    
    return top_items_sales_json

@app.route('/revenue-by-cat', methods=['GET'])
def get_revenue_by_cat():
    category_revenue = sales.groupby('Category')['Final Total'].sum().sort_values(ascending=False)
    cat_by_rev_list = [{'category': item, 'sales': sales} for item, sales in zip(category_revenue.index, category_revenue.values)]
    cat_by_rev_json = jsonify(cat_by_rev_list).response[0]
    return cat_by_rev_json

@app.route('/top-item-quantity', methods=['GET'])    
def get_top_item_quantity():
    item_quantity = sales.groupby('Item Name')['Qty.'].sum().sort_values(ascending=False)
    top_items_quantity = item_quantity.head(10)
    top_item_quan_l = [{'item_name': item, 'quantity': int(sales)} for item, sales in zip(top_items_quantity.index, top_items_quantity.values)]
    top_item_quan_json = jsonify(top_item_quan_l).response[0]
    return top_item_quan_json

@app.route('/rev-by-order-type', methods=['GET'])
def get_rev_by_order_type():
    order_type_revenue_analysis = sales.groupby('Area')['Final Total'].sum().sort_values(ascending=False)
    order_type_by_rev_list = [{'Area': item, 'sales': sales} for item, sales in zip(order_type_revenue_analysis.index, order_type_revenue_analysis.values)]
    order_type_by_rev_json = jsonify(order_type_by_rev_list).response[0]
    return order_type_by_rev_json

@app.route('/avg-value-order-type', methods=['GET'])
def avg_value_by_order_type():
    order_type_avg_transaction = sales.groupby('Area')['Final Total'].mean()
    order_type_by_avg_trans_list = [{'Area': item, 'avg_value': sales} for item, sales in zip(order_type_avg_transaction.index, order_type_avg_transaction.values)]
    order_type_by_avg_trans_json = jsonify(order_type_by_avg_trans_list).response[0]
    return order_type_by_avg_trans_json

@app.route('/customer-segmentation-most-popular-items', methods=['GET'])
def customer_segmentation_most_popular_items():
    customer_segments = sales.groupby('Phone').agg({
        'Final Total': 'sum',
        'Qty.': 'sum',
        'Category': lambda x: x.mode().iat[0],
    }).reset_index()
    popular_items = customer_segments.groupby('Category').size().sort_values(ascending=False)
    popular_items_list = [{'category': item, 'count': int(sales)} for item, sales in zip(popular_items.index, popular_items.values)]
    popular_items_json = jsonify(popular_items_list).response[0]
    return popular_items_json



@app.route('/daily-transactions', methods=['GET'])
def daily_transactions():
    sales['Date'] = pd.to_datetime(sales['Date'])
    daily_transactions = sales.groupby(sales['Date'].dt.date)['Invoice No.'].nunique()
    df_daily_transactions = pd.DataFrame({'Date': daily_transactions.index, 'Count': daily_transactions.values})
    json_data = df_daily_transactions.to_json(orient='records', date_format='iso')
    for day_number in range(1, 32):
        json_data = json_data.replace(f'"2024-01-{day_number:02}T00:00:00.000"', str(day_number))
    return json_data

@app.route('/hourly-transactions', methods=['GET'])
def hourly_transactions():
    sales['Timestamp'] = pd.to_datetime(sales['Timestamp'])
    sales['HourOfDay'] = sales['Timestamp'].dt.hour

    hourly_sales = sales.groupby('HourOfDay')['Final Total'].sum()

    # Convert the hour index to AM/PM format
    hourly_sales.index = [f"{hour % 12} {'AM' if hour < 12 else 'PM'}" for hour in hourly_sales.index]

    # Create a DataFrame with 'Hour' and 'Total Sales' columns
    hourly_sales_df = pd.DataFrame({'Hour': hourly_sales.index, 'Total Sales': hourly_sales.values})

    # Convert the DataFrame to JSON using to_json
    json_data = hourly_sales_df.to_json(orient='records')
    return json_data


@app.route('/repeat-purchase-rate', methods=['GET'])
def repeat_purchase_rate():
    repeat_purchase_rate = sales.groupby('Phone')['Date'].nunique().value_counts(normalize=True)
    ax_repeat_purchase = (repeat_purchase_rate.sort_index())*100
    repeat_purchase_json = pd.DataFrame({'visit freq': ax_repeat_purchase.index, 'Percentage': ax_repeat_purchase.values})
    json_data = repeat_purchase_json.to_json(orient='records')
    return json_data


     


if __name__ == '__main__':
    app.run(debug=True)
