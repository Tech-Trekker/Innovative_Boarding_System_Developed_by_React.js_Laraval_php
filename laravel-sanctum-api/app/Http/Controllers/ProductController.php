<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }
    //Cayegory wise products
    public function categoryProducts()
    {
       return Category::with('products')->get();
    }
    public function ProductCategory()
    {
       return Product::with('category')->get();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        if ($request->hasFile('image')) {
            $destinationPath = public_path().'/products';
            $file = $request->file('image');
            $fileName = time().'_'.$file->getClientOriginalName();
            $file->move($destinationPath, $fileName);
            $response = new Product([
                'name' => $request->name,
                'description' => $request->description,
                'slug' => $request->slug,
                'discount' => $request->discount,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'image' => $fileName,
            ]);
            $response->save();
        
           return $response;
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required',
        'slug' => 'required',
        'price' => 'required',
        'category_id' => 'required',
        'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048' // Allow image update but not required
    ]);

    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->name = $request->name;
    $product->description = $request->description ?? '';
    $product->slug = $request->slug;
    $product->discount = $request->discount ?? 0;
    $product->category_id = $request->category_id;
    $product->price = $request->price;
    $product->save();

    return $product;
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::destroy($id);
    }

     /**
     * Search for a name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return Product::where('name', 'like', '%'.$name.'%')->get();
    }
}