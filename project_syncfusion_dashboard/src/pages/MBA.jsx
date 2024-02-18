import React, { useState } from 'react';
import Select from 'react-select';
import './MBA.css'

const DropdownWithSearch = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isSearchable
            placeholder="Eg: Baked Vada Pav..."
        />
    );
};

// Example usage:
const MBA = () => {
    const [loader, setLoader] = useState(false)
    const [mbaoptions, setMBAOptions] = useState([])
    const [myoption, setMyOption] = useState("")
    const items = [
        "Orange Juice",
        "Iced Latte (350 ML)",
        "Almond Milk (200 ML)",
        "Chicken Calzone",
        "Coconut Nankhatai (with Egg)",
        "Iced Americano (350 ML)",
        "Add On Syrup (Add On Vanilla Syrup)",
        "Calzones Veg (Calzone Paneer)",
        "Cafe Latte (350 ML)",
        "Add On Syrup (Add On Caramel Syrup)",
        "Iced Mocha (350 ML)",
        "Classic Frappe (350 ML)",
        "Rosella Jam With Filter Coffee Ganache Macaroon (1 PIC)",
        "Strawberry White Chocolate Ganache With Rosella Jam Macaroon",
        "Double Restritto 44 Ml",
        "Iced Americano (450 Ml)",
        "Origanal South Indian Frappe (350 ML)",
        "Hot Chocolate (250 ML)",
        "Mix Berliner 2 Pcs (Lotus Biscoff Berliner)",
        "Mix Berliner 2 Pcs (Nutella Berliner)",
        "Baked Vada Pav",
        "Cappucino (250 ML)",
        "Almond Honey Latte (250 ML)",
        "Nariyal Irish Cream Frappe (350 ML)",
        "South Indian Filter Kaapi (150 ML)",
        "Hazelnut Frappe (350 ML)",
        "Pappa Roti (Plain)",
        "Berliners (Dark Choco Mousse Berliner)",
        "Berliners (Lotus Biscoff Berliner)",
        "Cafe Latte (250 ML)",
        "Tartlets (Salted Caramel Tartlet)",
        "Iced Latte (450 ML)",
        "Berliners (Nutella Berliner)",
        "Cappucino (350 ML)",
        "French Press",
        "Vietnamese (350 ML)",
        "Calzones Veg (Calzone Veg)",
        "Mix Berliner 2 Pcs (Blueberry Cheese Cake Berliner)",
        "Mix Berliner 2 Pcs (Dark Choco Mousse Berliner)",
        "Madagascar Chocochip Frappe (350 ML)",
        "Papparoti (Add On Nutella sauce)",
        "Hyderabadi Chicken Keema Pav",
        "Strawbery Rosella Frangipani Tart",
        "Papparoti (Plain)",
        "OAT MILK (200 ML)",
        "Baked Pav Bhaji",
        "Classic Frappe (450 ML)",
        "Caramel Frappe (350 ML)",
        "Yellow Banana Chips 60 Gm",
        "Madagascar Chocochip Frappe (350 Ml)",
        "Flat White 250 Ml",
        "Choco-crinkle-cookies (COMBO 3 PCS)",
        "Americano (250 ML)",
        "Calzone Mix 3 Pc (Calzone Paneer)",
        "Pappa Roti (Add On Nutella sauce)",
        "Cafe Mocha (250 ML)",
        "Bon Bon (350 ML)",
        "Madagascar Hot Chocolate (250 ML)",
        "Origanal South Indian Frappe (450 ML)",
        "Nariyal Irish Cream Frappe (350 Ml)",
        "Sea Salt Dark Mocha (250 ML)",
        "Sea Salt Dark Mocha Frappe (450 ML)",
        "Kaapicino (250 ML)",
        "Berliner Mix 3 Pcs (Nutella Berliner)",
        "Berliner Mix 3 Pcs (Dark Choco Mousse Berliner)",
        "Rosella Cheesecake Berliner",
        "Tartlets (chocolate Tartlet)",
        "Add On Syrup (Add On Irish Syrup)",
        "Cafe Mocha (350 ML)",
        "Cold Brew",
        "Almond Frappe (350 ML)",
        "Vietnamese (450 ML)",
        "South Indian Filter Kaapi (250 ML)",
        "Aeropress",
        "Rosella Jam With Filter Coffee Ganache Macaroon (2 PCS)",
        "Nariyal Irish Cream Frappe (450 ML)",
        "Pour Over",
        "Sea Salt Dark Mocha Frappe (350 ML)",
        "Americano (350 ML)",
        "Iced Americano (450 ML)",
        "Plain Nankhatai Veg",
        "White Loaf Bread",
        "South Indian Filter Kaapi (250 Ml)",
        "Hot Chocolate (250 Ml)",
        "Hyderabadi Soya Keema Pav",
        "Berliner Mix 3 Pcs (Blueberry Cheese Cake Berliner)",
        "Mix Tartlet 6 Pcs (chocolate Tartlet)",
        "Mix Tartlet 6 Pcs (salted Caramel tartlet)",
        "Mix Tartlet 6 Pcs (kodai cheese tartlet)",
        "Madagascar Chocochip Frappe (450 ML)",
        "Kaapicino (350 ML)",
        "Tartlets (Filter Kaapi Tartlet)",
        "Hazelnut Frappe (450 ML)",
        "Berliners (Blueberry Cheese Cake Berliner)",
        "Sea Salt Dark Mocha (350 ML)",
        "Add On Syrup (Add On hazelnuts Syrup)",
        "Vanilla Praline (350 ML)",
        "Irish Americano (250 ML)",
        "Tartlets (Kacha Nimbu Tartlet)",
        "Rosella Jam With Filter Coffee Ganache Macaroon (3 PCS)",
        "Vietnamese (350 Ml)",
        "Spicy Banana Chips 60 Gm",
        "CHILLI GUVAVA JUICE",
        "Classic Frappe (350 Ml)",
        "Cafe Mocha (250 Ml)",
        "Cashew Nuts Nankhatai Veg",
        "Gluten Free Hazelnut Brownie",
        "Whole Wheat Ladi Pav 4 Pc",
        "Almond Honey Latte (350 ML)",
        "Madagascar Hot Chocolate (350 ML)",
        "Iced Americano (350 Ml)",
        "MANGO JUICE",
        "Almond Frappe (450 ML)",
        "Choco-crinkle-cookies (with Egg) (COMBO 3 PCS)",
        "Hazelnut Frappe (450 Ml)",
        "Cappucino (350 Ml)",
        "PINAPPLE JUICE",
        "ESPRESSO (30 ML)",
        "Tartlets (kodai cheese tartlet)",
        "Macchiato 30 Ml",
        "Origanal South Indian Frappe (350 Ml)",
        "Choco-crinkle-cookies (with Egg) (COMBO 9 PCS)",
        "Baba Budan Peak 250 Gm",
        "Berliner Mix 3 Pcs (Blueberry Cheese Cake Berliner)",
        "Madagascar Hot Chocolate (250 Ml)",
        "Cappucino (250 Ml)",
        "ESPRESSO (60 ML)",
        "Combo-south Indian Filter Kaapi 150 ML + Papparoti",
        "Caramel Frappe (450 ML)",
        "Hot Chocolate (350 ML)",
        "Mix Tartlet 3 Pcs (chocolate Tartlet)",
        "Mix Tartlet 3 Pcs (salted Caramel tartlet)",
        "Mix Tartlet 3 Pcs (Filter Kaapi Tartlet)",
        "Bon Bon (450 ML)",
        "Vanilla Praline (450 ML)",
        "Combo-original South Indian Frappe 350 ML + Mix Banana Chips",
        "Mix Tartlet 3 Pcs (Kacha Nimbu Tartlet)",
        "Choco-crinkle-cookies (COMBO 6 PCS)",
        "Malnad Tonic (Choice Of Tonic)",
        "Calzone Mix 2 Pc (Calzone Paneer)",
        "Calzone Mix 2 Pc (Calzone Veg)",
        "Espresso Tonic (Tonic Water)",
        "Add On Syrup (Add On Tiramisu Syrup)",
        "Mix Tartlet 3 Pcs (kodai cheese tartlet)",
        "Americano (350 Ml)",
        "Iced Latte (350 Ml)",
        "Malnad Tonic (choice Of Tonic)",
        "OAT MILK (150 ML)",
        "Irish Americano (350 ML)",
        "Cafe Mocha (350 Ml)",
        "Almond Frappe (450 Ml)",
        "Madagascar Hot Chocolate (350 Ml)",
        "ALMOND MILK (150 ML)",
        "Iced Mocha (450 ML)",
        "Almond Frappe (350 Ml)",
        "Origanal South Indian Frappe (450 Ml)",
        "Mix Tartlet 6 Pcs (Filter Kaapi Tartlet)",
        "Irish Americano (350 Ml)",
        "Americano (250 Ml)",
        "Add On Syrup (Add On Cinnamon Syrup)",
        "Iced Latte (450 Ml)",
        "Oat Milk (150 Ml)",
        "Waves Of Malnad 250 GM",
        "Choco-crinkle-cookies (with Egg) (COMBO 6 PCS)",
        "Irish Americano (250 Ml)",
        "Classic Frappe (450 Ml)",
        "Bon Bon (350 Ml)",
        "Cafe Latte 350 Ml (350 Ml)",
        "Almond Milk (150 ML)",
        "Add On Syrup (Add On Nutella sauce)",
        "Oat Milk (150 ML)",
        "Wild Chikmanglur 250 GM",
        "Sea Salt Dark Mocha (250 Ml)",
        "Vietnamese (450 Ml)",
        "Add On Syrup (Add On Dark chocolate Sauce)",
        "Cafe Latte 350 Ml (250 ML)",
        "Madagascar Chocochip Frappe (450 Ml)",
        "Mix Tartlet 9 Pcs (chocolate Tartlet)",
        "Mix Tartlet 9 Pcs (Salted Caramel Tartlet)",
        "Mix Tartlet 9 Pcs (Filter Kaapi Tartlet)",
        "Mix Tartlet 9 Pcs (kodai cheese tartlet)",
        "Mix Tartlet 9 Pcs (Kacha Nimbu Tartlet)",
        "Kaapicino (250 Ml)",
        "Kodai Shroom 250 GM",
        "Coconut Natkhatai (with Egg)",
        "Kaapicino (350 Ml)",
        "Mix Tartlet 3 Pcs (salted Caramel  tartlet)",
        "Spicy Banana Chips  60 Gm",
        "Mix Berliner  2 Pcs (Nutella Berliner)",
        "Mix Berliner  2 Pcs (Blueberry Cheese Cake Berliner)",
    ];

    const options = items.map((item) => ({
        value: item,
        label: item,
    }));





    const handleSelect = async (selectedOption) => {
        setMyOption(selectedOption)
        console.log('Selected Option:', selectedOption);
        const url = `http://127.0.0.1:5000/get-frequently-bought-together`
        const body = {
            chk_item: selectedOption.value
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (response.status === 200) {
                const json = await response.json();
                setMBAOptions(json);
                console.log(json)
            }
            else
                console.log('error')
        }
        catch {
            console.log('error')
        }
    };
    if (loader)
        return <p>Loading...</p>
    return (
        <div className='p-8'>
            <h2>Select a dish to pair</h2>
            <div className="pt-4">
                <DropdownWithSearch options={options} onSelect={handleSelect} />
            </div>
            {
                mbaoptions.length > 0 &&
                <div class="box fadeInUp" style={{animationDelay:"2s", fontFamily: 'Arial, sans-serif', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', margin: '10px', backgroundColor: '#f5f5f5' }}>
                    <h2 style={{ fontSize: '1.5em', color: '#333' }}>List of Most Wanted Combinations</h2>
                    <ul>
                        
                            {mbaoptions.map((item, index) => (

                                <li key={index}>
                                    <div className="" style={{padding: "2rem", backgroundColor: "rgba(232, 234, 237, 1.00)", borderRadius: "7px", margin: "1rem 0"}}>
                                    {item} + {myoption.value} @ 12% Discount
                                    </div>
                                    </li>
                            ))}
                       
                    </ul>
                </div>
            }
        </div>
    );
};

export default MBA;
