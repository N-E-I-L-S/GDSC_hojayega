from flask import Flask, jsonify, request
import json
import pandas as pd
import pickle
from sklearn.metrics import mean_squared_error
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
from flask_cors import CORS, cross_origin
import random

app = Flask(__name__)
cors = CORS(app)


with open('rf_model.pkl', 'rb') as file:
    rf_model = pickle.load(file)

X_test = pd.read_csv('testing_data.csv') 
sales= pd.read_csv('./datasets/Sales_Data.csv')

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


@app.route('/get-customer-table', methods=['GET'])
def get_customer_table():
    df = pd.read_csv("./datasets/sales_with_segment.csv")
    df['Area']=df['Area'].fillna("Dinning")
    df['Name']=df['Name'].fillna("Unknown")
    # Specify the columns you want to include in the response
    selected_columns = ['Name','Order Type', 'Area', 'Item Name', 'Price', 'Phone', 'Segment']

    # Filter the DataFrame to include only the selected columns
    result_df = df[selected_columns]

    # Convert the filtered DataFrame to JSON
    json_response = result_df.to_dict(orient='records')

    return (json_response)


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
    # hourly_sales.index = [f"{hour % 12} {'AM' if hour < 12 else 'PM'}" for hour in hourly_sales.index]

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

def generate_association_rules(input_item):
    df = pd.read_csv('apriori_mba_data.csv')
    transactions = []
    x = []
    for i in range(len(df)):
        itm = df.iat[i, 1]
        x = itm.split(',')
        transaction = []
        for i in x:
            j = i.replace("'", "")
            if j.startswith("["):
                j = j[1:]
            elif j.endswith("]"):
                j = j[:1]
            if j.startswith(" "):
                j = j[1:]
            transaction.append(j)
        transactions.append(transaction)
    new_transactions1=[]
    for i in transactions:
        transaction=[]
        new_transactions1.append(i[:-1])
    new_transactions2=[]
    for new in new_transactions1:
      if(new == []):
        pass
      else:
        new_transactions2.append(new)
    new_transactions=[]
    for i in range(len(new_transactions2)):
      if(len(new_transactions2[i])==1):
        pass
      else:
        new_transactions.append(new_transactions2[i])

    te = TransactionEncoder()
    te_ary = te.fit(new_transactions).transform(new_transactions)
    df = pd.DataFrame(te_ary, columns=te.columns_)
    frequent_itemsets = apriori(df, min_support=0.01, use_colnames=True)
    # display(frequent_itemsets)
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)

    filtered_rules = rules[(rules['lift'] > 15) & (rules['confidence'] > 0.5)]

    sorted_rules = filtered_rules.sort_values(by=['lift', 'confidence'], ascending=False)
    if sorted_rules.empty:
        return "No association rules found with the given minimum support and confidence values."
    # Get the most likely bought items with the input_item as antecedent
    rules_antecedent = sorted_rules[sorted_rules['antecedents'].apply(lambda x: input_item in x)]
    rules_antecedent = rules_antecedent.sort_values(by=['lift', 'confidence'], ascending=False)

    # Get the most likely bought items with the input_item as consequent
    rules_consequent = sorted_rules[sorted_rules['consequents'].apply(lambda x: input_item in x)]
    rules_consequent = rules_consequent.sort_values(by=['lift', 'confidence'], ascending=False)
    merged_rules = pd.concat([rules_antecedent, rules_consequent])
    top_items = merged_rules.head(10)['antecedents'].apply(lambda x: list(x)[0])

    if(list(top_items)!=[]):
      s = set(list(top_items))
      return list(s)
    else :
      return list(set(list(frequent_itemsets['itemsets'])))


def get_most_likely_bought_item(input_item):
    likely_items = generate_association_rules(input_item)
    temp = likely_items
    if(input_item in temp):
      temp.remove(input_item)
    i = 0
    while temp == input_item:
        i += 1
        if i == len(likely_items):
            temp = likely_items[0]
            break
        temp = likely_items[i]
        if temp == '':
            temp = likely_items[i+1]
        else:
            pass
    if type(temp[0]) == frozenset:
      return list(temp)
    else:
      return (temp)

@app.route('/get-frequently-bought-together', methods=['POST'])
def get_frequently_bought_together():
    try:
        data = request.get_json()
        chk_item = data['chk_item']
        
        result = get_most_likely_bought_item(chk_item)
        if len(result) > 5:
            frequently_bought_together = list(result)[0:4]
        else:
            frequently_bought_together = list(result)[:4]

        # Convert frozenset to list before returning JSON
        frequently_bought_together = [list(item) for item in frequently_bought_together]
        flattened_list = [item for sublist in frequently_bought_together for item in sublist]
        final_list =  random.sample(flattened_list, 2)
        return jsonify(final_list)
    
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == '__main__':
    app.run(debug=True)