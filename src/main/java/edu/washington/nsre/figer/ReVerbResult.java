package edu.washington.nsre.figer;

import edu.washington.cs.knowitall.nlp.ChunkedSentence;
import edu.washington.cs.knowitall.nlp.extraction.ChunkedBinaryExtraction;

import java.util.List;

public class ReVerbResult {
	public String raw_sentence;
	public ChunkedSentence chunk_sent;
	public List<ChunkedBinaryExtraction> reverb_extract;
	//String lengthTokens;

}
