<?php

namespace App\Models;

use App\Models\SurveyAnswer;
use Spatie\Sluggable\HasSlug;
use App\Models\SurveyQuestion;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'description', 'expire_date','image', 'user_id', 'status', 'created_at', 'updated_at'];

    

    public function getSlugOptions() : SlugOptions {
        return SlugOptions::create()
        ->generateSlugsFrom('title')
        ->saveSlugsTo('slug');
    }

    public function questions(){
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answer()
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
