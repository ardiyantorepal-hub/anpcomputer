<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // READ
    public function index()
    {
        return response()->json(Product::all());
    }

    // CREATE
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    // DELETE
    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Produk dihapus']);
    }
}
