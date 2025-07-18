<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use App\Models\groubcoustemodel;

class groubcouste extends Controller
{
    public function ajouter_coust_jour(Request $request)
    {
        groubcoustemodel::create([
            'date_coust' => $request->date_coust,
            'coust' => $request->coust,
        ]);
        return response()->json(['message' => 'Coust added successfully'], 201);
    }
    public function get_coust_jour()
    {
        $cousts = groubcoustemodel::all();
        return response()->json($cousts, 200);
    }
    public function edit_coust_jour(Request $request)
    {
        $coust = groubcoustemodel::find($request->id);
        if ($coust) {
            $coust->coust = $request->coust;
            $coust->save();
            return response()->json(['message' => 'Coust updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Coust not found'], 404);
        }
    }
    public function edit_commande_coust_jour(Request $request)
    {
        $commande = Commande::find($request->id_commande);
        if ($commande) {
            $commande->coustgroub_id = $request->coustgroub_id;
            $commande->save();
            return response()->json(['message' => 'Commande updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Commande not found'], 404);
        }
    }
public function edit_coust_cmd(Request $request)
{
    $commandes = $request->commandes;
    $total_commandes = count($commandes);
    $cost = $request->cost;

    if ($total_commandes == 0) {
        return response()->json(['message' => 'Aucune commande à mettre à jour.'], 400);
    }

    foreach ($commandes as $commandeData) {
        $commande = Commande::find($commandeData['id_commande']);
        if ($commande) {
            $commande->cost = $cost / $total_commandes; 
            $commande->save();
        } else {
            return response()->json(['message' => "Commande with ID {$commandeData['id_commande']} not found."], 404);
        }
    }

    return response()->json(['message' => 'Coût mis à jour pour toutes les commandes', 'commandes' => $commandes], 200);
}
}