package edu.washington.cs.figer.ml;

import edu.washington.cs.figer.data.Instance;

import java.io.Serializable;
import java.util.ArrayList;

public abstract class Inference implements Serializable {
	private static final long serialVersionUID = -4671202801217272775L;

	public abstract Prediction findBestLabel(Instance x, Model m);

	public abstract ArrayList<Prediction> findPredictions(Instance x, Model m);
}