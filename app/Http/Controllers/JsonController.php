<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class JsonController extends Controller
{
    private $dbFilePath;

    public function __construct()
    {
        $this->dbFilePath = public_path('db.json');
    }

    // ✅ Lire le fichier JSON
    private function readJsonFile()
    {
        if (!File::exists($this->dbFilePath)) {
            return ["commande" => [], "ville" => [], "status" => []];
        }

        $jsonContent = File::get($this->dbFilePath);

        if (empty($jsonContent)) {
            Log::error('Le fichier JSON est vide.');
            return ["commande" => [], "ville" => [], "status" => []];
        }

        $decodedData = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decodedData)) {
            Log::error('Erreur de décodage JSON: ' . json_last_error_msg());
            return ["commande" => [], "ville" => [], "status" => []];
        }

        return [
            "commande" => $decodedData['commande'] ?? [],
            "ville" => $decodedData['ville'] ?? [],
            "status" => $decodedData['status'] ?? [],
            "pokemons" => $decodedData['pokemons'] ?? []
        ];
    }

    // ✅ Écrire dans le fichier JSON
    private function writeJsonFile($data)
    {
        try {
            File::put($this->dbFilePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            return true;
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'écriture dans le fichier JSON: ' . $e->getMessage());
            return false;
        }
    }

    // ✅ Récupérer toutes les commandes
    public function getCommandes()
    {
        $data = $this->readJsonFile();
        return response()->json($data['commande']);
    }
    
     public function getpokemons()
    {
        $data = $this->readJsonFile();
        return response()->json($data['pokemons']);
    }

    // ✅ Récupérer une commande par ID
    public function getCommande($id)
    {
        $data = $this->readJsonFile();
        $commande = collect($data['commande'])->firstWhere('id', $id);

        return $commande 
            ? response()->json($commande) 
            : response()->json(['message' => 'Commande non trouvée'], 404);
    }

    // ✅ Créer une nouvelle commande
    public function createCommande(Request $request)
    {
        $data = $this->readJsonFile();

        $newCommande = array_merge($request->only([
            "id_commande", "nom_client", "numero_client", "adresse_client",
            "ville", "ville_id", "prix_livraison", "quntite", "prix",
            "commantaire", "produit_id", "nom_produit", "ville_commande", "id_user" ,"date_commande"
        ]), ["id" => uniqid()]);

        $data['commande'][] = $newCommande;
        $this->writeJsonFile($data);

        return response()->json($newCommande, 201);
    }
    
    public function createPokemons(Request $request)
    {
        $data = $this->readJsonFile();

        $newPokemons = array_merge($request->only([
            "id", "name", "hp", "figureCaption",
            "attackName", "attackStrength", "attackDescription", "image", "type"
        ]), ["id" => uniqid()]);

        $data['pokemons'][] = $newPokemons;
        $this->writeJsonFile($data);

        return response()->json($newPokemons, 201);
    }

    // ✅ Mettre à jour une commande
    public function updateCommande(Request $request, $id)
    {
        $data = $this->readJsonFile();
        $index = collect($data['commande'])->search(fn($c) => $c['id'] == $id);

        if ($index !== false) {
            $data['commande'][$index] = array_merge(
                $data['commande'][$index],
                array_filter($request->all(), fn($value) => !is_null($value))
            );
            $this->writeJsonFile($data);
            return response()->json($data['commande'][$index]);
        }

        return response()->json(['message' => 'Commande non trouvée'], 404);
    }
    
    
    public function updatePokemons(Request $request, $id)
    {
        $data = $this->readJsonFile();
        $index = collect($data['pokemons'])->search(fn($c) => $c['id'] == $id);

        if ($index !== false) {
            $data['pokemons'][$index] = array_merge(
                $data['pokemons'][$index],
                array_filter($request->all(), fn($value) => !is_null($value))
            );
            $this->writeJsonFile($data);
            return response()->json($data['pokemons'][$index]);
        }

        return response()->json(['message' => 'pokemon non trouvée'], 404);
    }

    // ✅ Supprimer une commande
    public function deleteCommande($id)
    {
        try {
            $data = $this->readJsonFile();

            if (!isset($data['commande']) || !is_array($data['commande'])) {
                return response()->json(['message' => 'Structure de données invalide'], 400);
            }

            $filtered = array_filter($data['commande'], fn($c) => $c['id'] != $id);
            if (count($data['commande']) === count($filtered)) {
                return response()->json(['message' => 'Commande non trouvée'], 404);
            }

            $data['commande'] = array_values($filtered); // Re-index
            $this->writeJsonFile($data);

            return response()->json(['message' => 'Commande supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function deletePokemons($id)
    {
        try {
            $data = $this->readJsonFile();

            if (!isset($data['pokemons']) || !is_array($data['pokemons'])) {
                return response()->json(['message' => 'Structure de données invalide'], 400);
            }

            $filtered = array_filter($data['pokemons'], fn($c) => $c['id'] != $id);
            if (count($data['pokemons']) === count($filtered)) {
                return response()->json(['message' => 'Commande non trouvée'], 404);
            }

            $data['pokemons'] = array_values($filtered); // Re-index
            $this->writeJsonFile($data);

            return response()->json(['message' => 'Pokemon supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function hello($id)
    {
        
        try {
            $data = $this->readJsonFile();

            if (!isset($data['commande']) || !is_array($data['commande'])) {
                return response()->json(['message' => 'Structure de données invalide'], 400);
            }

            $filtered = array_filter($data['commande'], fn($c) => $c['id'] != $id);
            if (count($data['commande']) === count($filtered)) {
                return response()->json(['message' => 'Commande non trouvée'], 404);
            }

            $data['commande'] = array_values($filtered); // Re-index
            $this->writeJsonFile($data);

            return response()->json(['message' => 'Commande supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Récupérer toutes les villes
    public function getVilles()
    {
        $data = $this->readJsonFile();
        return response()->json($data['ville']);
    }

    // ✅ Récupérer tous les statuts
    public function getStatuses()
    {
        $data = $this->readJsonFile();
        return response()->json($data['status']);
    }
}
