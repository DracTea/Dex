<?php

namespace App;

class Vite {
    protected string $hotFile;
    protected string $buildDirectory = 'dist/';
    protected array $entryPoints = [];
    protected string $path = '';

    public function __construct() {
        $this->path = base_path('');
    }

    public static function make(): self {
        return new static();
    }

    public static function config() {
    }

    public function useHotFile($path) {
        $this->hotFile = $path;

        return $this;
    }

    public function useBuildDirectory($path) {
        $this->buildDirectory = $path;

        return $this;
    }

    public function withEntryPoints($entryPoints) {
        $this->entryPoints = $entryPoints;

        return $this;
    }

    public function toHtml() {
        return $this->__invoke();
    }

    public function isRunningHot() {
        return is_file(base_path($this->hotFile) ?? base_path('/hot'));
    }

    private function manifest(): string {
        //	  $time = filemtime($man);
        $tags = '';
        $man = base_path( $this->buildDirectory . '/.vite/manifest.json');
        //$comp = base_path('public/' . $this->buildDirectory . '/cache');

        //if (file_exists($comp)) return file_get_contents($comp);
        if (!file_exists($man)) {
            die('Manifest file not found');
            return '';
        }

        $content = file_get_contents($man);
        $manifest = json_decode($content, true);

        foreach ($this->entryPoints as $fileStr) {
            $file = $fileStr; // str_replace('src/', '', $fileStr);
            if (key_exists($file, $manifest)) {
                if (str_contains($manifest[$file]['file'], '.js')) {
                    $tags .= '<script type="module" defer  src="' . asset($this->buildDirectory . '/' . $manifest[$file]['file']) . '"></script>' . "\n";
                } else {
                    $tags .= '<link rel="stylesheet" href="' . asset($this->buildDirectory . '/' . $manifest[$file]['file']) . '" />' . "\n";
                }
            }
        }

        // foreach (Tmpl::$css as $value) {
        //     $file = 'src/styles/' . $value . '.scss';
        //     if (key_exists($file, $manifest)) {
        //         $tags .= '<link rel="stylesheet" href="' . asset($this->buildDirectory . '/' . $manifest[$file]['file']) . '" />' . "\n";
        //     } else {
        //         $tags .= '<!-- not found ' . $file . ' -->' . "\n";
        //     }
        // }

        //if (!empty($tags)) file_put_contents($comp, $tags);
        return $tags;
    }

    private function hotAsset() {
        $file = file_get_contents(base_path($this->hotFile));

        $tags = '<script type="module" crossorigin src="' . $file . '/@vite/client"></script>' . "\n";

        foreach ($this->entryPoints as $entry) {
            if (str_contains($entry, '.js') || str_contains($entry, '.ts')) {
                $tags .= '<script type="module" crossorigin src="' . ($file . '/' . $entry) . '"></script>' . "\n";
            } else {
                $tags .= '<link rel="stylesheet" href="' . ($file . '/' . $entry) . '" />' . "\n";
            }
        }

        // foreach (Tmpl::$css as $value) {
        //     $tags .= '<link rel="stylesheet" href="' . $file . '/src/styles/' . $value . '.scss" />' . PHP_EOL;
        // }

        return $tags;
    }

    private function base_path($str) {
        return $this->path . '/'  . ltrim($str, "/");
    }

    public function __invoke(): string {
        if ($this->isRunningHot()) {
            return $this->hotAsset();
        }


        return $this->manifest();
    }
}
