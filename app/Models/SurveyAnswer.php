<?php

namespace App\Models;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SurveyAnswer extends Model
{
    use HasFactory;

    const UPDATED_AT = null;
    const CREATED_AT = null;

    protected $fillable = ['survey_id', 'start_date', 'end_date'];

    public function belongsTo()
    {
        return $this->belongsTo(Survey::class);
    }
}
