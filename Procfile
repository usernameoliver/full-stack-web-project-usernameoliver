cleaner:    rm .git/hooks/pre-push
worker:    java -Xmx10g -cp target/classes:target/dependency/* edu.washington.nsre.extraction.NewsSpikePredict data/scale/model data/test data/scale/predict
web:    java -cp target/classes:target/dependency/* Main
