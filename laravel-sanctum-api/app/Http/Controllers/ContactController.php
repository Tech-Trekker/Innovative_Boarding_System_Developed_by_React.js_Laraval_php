<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        return Contact::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required'
        ]);
        
        return Contact::create($request->all());
    }

}
