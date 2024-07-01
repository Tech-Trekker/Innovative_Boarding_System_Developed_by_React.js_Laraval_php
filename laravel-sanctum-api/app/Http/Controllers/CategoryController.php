<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $destinationPath = public_path().'/categories';
            $file = $request->file('image');
            $fileName = time().'_'.$file->getClientOriginalName();
            $file->move($destinationPath, $fileName);
            $response = new Category([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $fileName,
            ]);
            $response->save();
        
           return $response;
        }
    }
    public function show($id)
    {
        return Category::find($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);
    
        $category = Category::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $category->name = $request->name;
        $category->description = $request->description ?? '';
        $category->save();
    
        return $category;
    }
    public function destroy($id)
    {
        return Category::destroy($id);
    }
}
