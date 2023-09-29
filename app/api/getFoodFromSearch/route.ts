import { NextResponse } from 'next/server';
import axios from 'axios';
import { Food, FoodSearchResponse } from '@/app/types';

export async function GET(){
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.nal.usda.gov/fdc/v1/foods/search',
            params:{
                api_key: "Zo2WreKVULHZ10uh5T9CnhnqTDg3REc1i9ZOswDF",
            },
            data: {
                query: "egg",
                dataType: [
                  "Foundation",
                  "SR Legacy"
                ],
                pageSize: 10,
                pageNumber: 1,
                sortBy: "dataType.keyword",
                sortOrder: "asc"
              }
        })
        if (!response.data.error) {
          const filteredResponse = []

          response.data?.foods.map((food: Food, index: number) => {

            const filteredByCal = food.foodNutrients.filter(nutrient => nutrient.nutrientName.toLowerCase().includes(('Energy').toLowerCase()))
            filteredResponse.push({description: food.description, calories: filteredByCal})
          })

          return NextResponse.json(filteredResponse)
        } else {
          return NextResponse.json(response.data)
        }
      } catch (err) {
        return NextResponse.json({ message: 'Internal server error', status: 500 })
      }
}

