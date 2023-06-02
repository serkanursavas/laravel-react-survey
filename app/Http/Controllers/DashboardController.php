<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;

class DashboardController extends Controller
{
    public function index (Request $request){

        $user = $request->user();

        // Total Number of Surveys
        $total = Survey::query()->where('user_id', $user->id)->count();

        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        // Total Number of Answers
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answer.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id'. $user->id)
            ->count();

        // Latest 5 Answer
        $latestAnswer = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey.id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $total,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswer)            
        ];
    }
}
