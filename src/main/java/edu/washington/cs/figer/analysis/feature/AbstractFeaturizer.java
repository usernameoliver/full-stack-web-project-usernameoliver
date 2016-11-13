package edu.washington.cs.figer.analysis.feature;

import edu.washington.cs.figer.data.EntityProtos.Mention;
import edu.washington.cs.figer.ml.Model;

import java.util.ArrayList;

public interface AbstractFeaturizer {
	public void apply(Mention m, ArrayList<String> features, Model model);

	public void init(Model m);
}
